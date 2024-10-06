import React from 'react'
import styled from 'styled-components';

const MenuContainer = styled.div`

`;
const Logo = styled.div``;
const Close = styled.div``;
const Elements = styled.div``;
const NavText = styled.div``;

const Sidebar = () => {
  return (
    <MenuContainer>
      <Logo>SideBar</Logo>
      <Close>
        <CloseRounded>

        </CloseRounded>
      </Close>
      <Elements>
        <HomeRounded>
          <NavText>Dashboard</NavText>
        </HomeRounded>
      </Elements>
    </MenuContainer>
  )
}

export default Sidebar;
