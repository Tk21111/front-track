import '../index.css';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ReactDom from 'react-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectCurrentAka, selectCurrentImage, selectCurrentScore, selectCurrentUserId } from '../features/auth/authSlice';

import { switchLanguage , translate } from '../hooks/translator';

function Header() {
  const navigate = useNavigate();
  const p = useParams();
  const [isOpen, setIsOpen] = useState(false);


  const user = useSelector(selectCurrentUser);
  const aka = useSelector(selectCurrentAka);
  const userId = useSelector(selectCurrentUserId);
  const image = useSelector(selectCurrentImage);
  const score = useSelector(selectCurrentScore); 
  

  const handleSwitch = () => {
    switchLanguage();
    };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  return ReactDom.createPortal(
    <header className="header" style={{zIndex : 909}}> 
      <div className='headerComp'>
        <img onClick={() => { navigate(-1); }} src={require('../components/img/back.png')} alt="back" className="logo" style={{marginLeft : '-15px' , height : '40px' , width : '30px'}} />
        <div className="circle">{score || 0}</div>
      </div>
      
      <nav className='headerComp'>
        <a href='/getuser' style={{display : 'flex' , flexDirection : 'column' , alignItems : 'center'}}>
          <div className='circle' style={{height: '35px' , width: '35px' , backgroundColor : 'whitesmoke' , borderColor : 'gray' ,boxShadow : '1px 1.5px 0.5px 2px black'}}>
            <div className='circle' style={{height: '30px' , width: '30px' , backgroundColor : '#B0E7FF' , borderColor : 'gray'}}/>

          </div>
          <h2 style={{color : 'black' , fontSize : '20px' , textAlign : 'center'}}>{"username : " + "\n" + user?.slice(0,10)}</h2>
        </a>
      </nav>
      <Drawer content='space-between' anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button component={Link} to="/welcome" onClick={toggleDrawer(false)}>
            หน้าหลัก
          </ListItem>
          <ListItem button component={Link} to="/user/update" onClick={toggleDrawer(false)}>
            แก้ไขโปรไฟล์
          </ListItem>
          <ListItem button component={Link} to="/save" onClick={toggleDrawer(false)}>
            ดูโพสต์ที่เก็บไว้
          </ListItem>
          <ListItem button component={Link} to="/getuser" onClick={toggleDrawer(false)}>
            getUserAdmin
          </ListItem>
          <ListItem button component={Link} onClick={() => {handleSwitch() ; toggleDrawer(false);}}>
            {translate("changeLang")}
          </ListItem>
          {image ? <img src={image[0]?.url} alt="note image" style={{ flexGrow: 1, maxWidth: 300, maxHeight: 300, margin: "5%" }} /> : <p>on img</p>}
        </List>
        <List>
          <ListItem button component={Link} to="/logout" onClick={toggleDrawer(false)}>
            ออกจากระบบ
          </ListItem>
          <ListItem button component={Link} to="/contract" onClick={toggleDrawer(false)}>
            ติดต่อ
          </ListItem>
        </List>
      </Drawer>
    </header>, document.body
   
  );
}

export default Header;
