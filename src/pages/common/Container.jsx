import React, { useEffect, useState, } from 'react';
import './css/Container.css'
export default function Container(props) {

    return (
        <div className='bgcolor'>
            {
                React.Children.map(props.children, (item) => {
                    return React.cloneElement(item, {
                        item,
                        parent: {
                            props
                        }
                    })
                })
            }
        </div>
    )
}