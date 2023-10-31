import SideBar from '../Sidebar'
import Navbar from '../Navbar'
import './frame.css'

const Frame=(props)=>{
    return <div className="frame">
        <SideBar/>
        <div className="rightframe">
            <Navbar/>

            <div className="content">
                <h1 className='header'>{props.heading}</h1>
                {props.children}

            </div>
        </div>

    </div>
}
export default Frame