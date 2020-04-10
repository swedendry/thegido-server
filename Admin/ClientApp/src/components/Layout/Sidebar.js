import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useDashboard from '../../hooks/useDashboard';

import {
    IoIosRocket,
} from 'react-icons/io';

/**
 * Styles
 */
const Sidebar = styled.div`
  position: fixed;
  height: calc(100vh - 50px);
  width: 250px;
  left: ${props => (props.view === 'mobile' ? `${0}px` : `${-270}px`)};
  top: 50px;
  background: #7474BF;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #348AC7, #7474BF);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #348AC7, #7474BF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  z-index: 100;
  box-shadow: 2px 1px 15px rgba(56, 56, 56, 0.2);
  transition: all .2s ease 0s;
  overflow: hidden;
  opacity: 1;

  @media only screen and (min-width: 576px) {
    width: ${props => (props.view === 'min' ? `${80}px` : `${250}px`)};
    height: 100vh;
    top: 0;
    left: 0;
  }
`;

const Brand = styled.div`
  position: relative;
  height: 50px;
  width: ${props => (props.view === 'min' ? `${80}px` : `${250}px`)};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .3s;  

  h1 {
    font-family: 'Pacifico', cursive;
    font-size: 1.7rem;
    color: #fff;
    margin: 0;
  }
`;

const Buttons = styled.div`
  position: relative;
  height: calc(100vh - 130px);
  background: rgba(245, 246, 250, 0.04);
  padding-top: 10px;
  overflow: hidden;
  transition: .3s;  

  ::-webkit-scrollbar {
    width: 0;
  };
  @media only screen and (min-width: 576px) {
    height: calc(100vh - 80px);
  }
`;

const Btn = styled(Link)`
  position: relative;
  height: ${props => (props.view === 'min' ? `${60}px` : `${50}px`)};
  width: 100%;
  font-family: 'Muli', sans-serif;
  font-size: 14px;
  padding-left: ${props => (props.view === 'min' ? `${0}px` : `${30}px`)};
  display: flex;
  justify-content: ${props => (props.view === 'min' ? 'center' : 'space-between')};
  align-items: center;
  transition: .2s;
  background: ${props => (props.click === props.to && `rgba(${47},${53},${66},${.05})`)};
  color: #fff;
  outline: none;

  :hover {
    background: rgba(47, 53, 66, .05);
    color: #fff;
    transition: .2s;  
    cursor: pointer !important;
    text-decoration: none;
  }
`;

const Icon = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  font-size: ${props => (props.size ? props.size : `${1.2}rem`)};
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: ${props => (props.view === 'min' ? `${0}px` : `${20}px`)}; 
`;

const Text = styled.span`
  font-family: 'Muli', sans-serif;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.div`
  position: relative;
  height: 30px;
  width: ${props => (props.view === 'min' ? `${100}%` : `${250}px`)};
  background: rgba(245, 246, 250, 0.04);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .3s;  

  span {
    font-family: 'Pacifico', cursive;
    font-size: .7rem;
    color: #fff;
  }
`;

export default function Main({ brand, buttons }) {
    const { view } = useDashboard();

    const [click, setClick] = useState('');

    const createButtons = () => (
        <Buttons view={view.sidebar}>
            {buttons.map(btn => (
                <Btn
                    key={Math.random()}
                    view={view.sidebar}
                    to={btn.route}
                    onClick={() => setClick(btn.route)}
                    click={click}
                >
                    <Text>{view.sidebar === 'min' ? '' : btn.name}</Text>
                    <Icon view={view.sidebar}>{btn.icon}</Icon>
                </Btn>
            ))}
        </Buttons>
    );

    return (
        <Sidebar view={view.sidebar}>
            {/* Brand */}
            <Brand view={view.sidebar}>
                <h1>{view.sidebar === 'min' ? brand.min : brand.max}</h1>
                <a href="/swagger/index.html" target="_blank"><Icon view={view.sidebar}>{<IoIosRocket size={17} color="#ee5253"/>}</Icon></a>
            </Brand>

            {/* Buttons */}
            {createButtons(view.sidebar, buttons)}

            {/* Footer */}
            <Footer view={view.sidebar}>
                <span>{view.sidebar === 'min' ? brand.min : brand.max}</span>
            </Footer>
        </Sidebar>
    );
};
