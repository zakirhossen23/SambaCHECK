import * as React from 'react'

import NavLink from 'next/link';
import logo from "/public/Logo.svg";

export function Logo(): JSX.Element {
    return (
        <div className="logo">

            <NavLink href="/">
                <div style={{ "display": "flex" }}>
                    <img className="NavImg" src={logo} />
                </div>
            </NavLink>
        </div>
    )
}
