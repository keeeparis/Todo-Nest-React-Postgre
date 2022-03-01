import { LoadingOutlined } from '@ant-design/icons'
import classes from './Spinner.module.scss'

export const Spinner = () => {
    return (
        <div className={classes.wrapper}>
            <LoadingOutlined style={{fontSize: '30px'}} />
        </div>
    )
}
