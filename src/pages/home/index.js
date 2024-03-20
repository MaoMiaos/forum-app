import { Button } from 'antd'
import './home.scss'
import {useNavigate} from 'react-router-dom'

function Home() {

    const navigate = useNavigate()
    return (
        <div className="P-home">
            <h1>Home Page</h1>
            <div className="ipt-con">
                <Button type="primary" onClick={() => navigate('/login')}>Login</Button>
            </div>
        </div>
    )
}

export default Home