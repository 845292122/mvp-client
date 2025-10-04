import { Button } from 'antd'

type InfoDrawerExtraProps = {
  handleOk: () => void
}

const InfoDrawerExtra: React.FC<InfoDrawerExtraProps> = ({ handleOk }) => {
  return (
    <Button type="primary" onClick={handleOk}>
      提交
    </Button>
  )
}

export default InfoDrawerExtra
