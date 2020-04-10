import React from 'react';
import styled from 'styled-components';

import {
    IoMdMenu,
    IoMdSettings,
    IoMdPerson,
    IoMdPower,
} from 'react-icons/io';

import DropDown from './DropDown';

import useDashboard from '../../hooks/useDashboard';

/**
 * Styles
 */
const Navbar = styled.div`
  position: fixed;
  height: 50px;
  width: 100%;
  z-index: 101;
  box-shadow: 15px 3px 15px rgba(56, 56, 56, 0.2);
  transition: all .2s ease 0s;

  @media only screen and (min-width: 576px) {
    width: ${props => (props.view === 'min' ? `calc(${100}% - ${80}px)` : `calc(${100}% - ${250}px)`)};
    left: ${props => (props.view === 'min' ? `${80}px` : `${250}px`)};
  }
`;

const Buttons = styled.div`
  position: relative;
  height: 50px;
`;

const Btn = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .3s;
  font-size: 1.3rem;
  color: rgba(56, 56, 56, 0.7);

  :hover {
    background: rgba(47, 53, 66, .05);
    transition: .3s;
    cursor: pointer;
  }
`;

// Fragments
const Button = ({ icon, event }) => (
    <Btn onClick={event}>{icon}</Btn>
);

export default function Main({ dropdown }) {
    const { view, onToggle } = useDashboard();

    const { user, buttons } = dropdown;

    const handleToggle = () => {
        onToggle(view);
    };

    return (
        <Navbar view={view.navbar}>
            {/* Left */}
            <Buttons>
                <Button icon={<IoMdMenu />} event={handleToggle} />
            </Buttons>

            {/* Right */}
            <DropDown
                user={user}
                buttons={[
                    {
                        name: buttons.settings.name || 'Settings',
                        icon: <IoMdSettings size={17} />,
                        route: '/settings',
                        event: buttons.settings.event
                    },
                    {
                        name: buttons.profile.name || 'Profile',
                        icon: <IoMdPerson size={17} />,
                        route: '/profile',
                        event: buttons.profile.event
                    },
                    {
                        name: buttons.logout.name || 'Logout',
                        icon: <IoMdPower size={17} color="#ee5253" />,
                        route: '/logout',
                        event: buttons.logout.event
                    },
                ]}
            />
        </Navbar>
    );
};
