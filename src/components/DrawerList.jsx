import { Box, List, ListItem } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'

const DrawerList = () => {
  const navItems = ['customer', 'training', 'profile'];
  const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate()
    const handleNavigation = (item) => {
        navigate(`/${item}`)
      
      };
      
  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center'  }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <button  onClick={() => handleNavigation(item)} >
              {item} 
            </button>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default DrawerList
