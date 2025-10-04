import { Modal, Tree } from 'antd'
import React, { useEffect, useState } from 'react'
import type { TreeDataNode } from 'antd'

type AssignPermissionProps = {
  open: boolean
  onCancel?: () => void
  onSubmit: (values: any) => void
  dataSource: TreeDataNode[]
  defaultCheckedKeys: string[]
}

// 工具函数：递归计算半选节点
const calculateHalfCheckedKeys = (
  treeData: TreeDataNode[],
  defaultCheckedKeys: string[]
): string[] => {
  return treeData.reduce<string[]>((result, node) => {
    const isNodeChecked = defaultCheckedKeys.includes(node.key as string)
    if (node.children) {
      const childHalfCheckedKeys = calculateHalfCheckedKeys(node.children, defaultCheckedKeys)
      if (!isNodeChecked && childHalfCheckedKeys.length > 0) {
        result.push(node.key as string)
      }
      result.push(...childHalfCheckedKeys)
    }
    return result
  }, [])
}

// TODO：渲染bug
const AssignPermission: React.FC<AssignPermissionProps> = ({
  open,
  onCancel,
  onSubmit,
  dataSource,
  defaultCheckedKeys
}) => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>(defaultCheckedKeys)
  const [halfCheckedKeys, setHalfCheckedKeys] = useState<string[]>(
    calculateHalfCheckedKeys(dataSource, defaultCheckedKeys)
  )

  const handleCheck = (checkedKeys: any, e: any) => {
    const { halfCheckedKeys } = e
    // 合并全选和半选的节点
    setCheckedKeys(checkedKeys)
    setHalfCheckedKeys(halfCheckedKeys)
  }

  useEffect(() => {
    setCheckedKeys(defaultCheckedKeys)
    setHalfCheckedKeys(calculateHalfCheckedKeys(dataSource, defaultCheckedKeys))
  }, [defaultCheckedKeys, dataSource])

  return (
    <Modal
      title="分配权限"
      open={open}
      destroyOnClose
      onCancel={onCancel}
      onOk={() => onSubmit([...checkedKeys, ...halfCheckedKeys])}
    >
      <Tree
        treeData={dataSource}
        checkable
        defaultExpandAll
        blockNode
        showLine
        onCheck={handleCheck}
        checkedKeys={checkedKeys}
      />
    </Modal>
  )
}

export default AssignPermission
