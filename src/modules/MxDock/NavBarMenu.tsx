import React from 'react';

export interface Node {
    key: string;
    label: string;
    link: string;
    microflow?: string;
    external?: boolean;
}

/**
 * handle errors when `nodes` is invalid here,
 * so this component is robust by itself,
 * not depending on its parent's implementation
 */

const NavBarMenu = ({ nodes }: { nodes: Node[] | null | undefined }) =>
    nodes && nodes.length > 0 ? (
        <ul className="MxDock__nav-bar-menu">
            {nodes.map(node => (
                <li key={node.key} className="MxDock__nav-bar-menu-item">
                    <a
                        className="MxDock__nav-bar-menu-item-link"
                        href={node.link}
                        target={node.external ? '_blank' : '_self'}
                    >
                        {node.label}
                    </a>
                </li>
            ))}
        </ul>
    ) : null;

export default NavBarMenu;
