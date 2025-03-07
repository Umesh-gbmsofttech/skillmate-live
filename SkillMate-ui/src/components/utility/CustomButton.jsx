import React from 'react';
import { Button } from '@mui/material';

// Helper function to adjust brightness of a color
function adjustBrightness(hexColor, amount) {
    if (!hexColor.startsWith('#')) {
        return hexColor;
    }
    hexColor = hexColor.replace("#", "");
    let r = parseInt(hexColor.substring(0, 2), 16);
    let g = parseInt(hexColor.substring(2, 4), 16);
    let b = parseInt(hexColor.substring(4, 6), 16);

    r = Math.max(0, Math.min(255, r + amount));
    g = Math.max(0, Math.min(255, g + amount));
    b = Math.max(0, Math.min(255, b + amount));

    const toHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const CustomButton = ({ fontWeight, buttonFontSize, fontFamily, backgroundColor, color, width, text, onClick, padding, margin, marginTop, marginBottom, marginLeft, marginRight }) => {
    return (
        <Button
            onClick={ onClick }
            sx={ {
                backgroundColor: backgroundColor || 'var(--color-p3)',
                color: color || 'var(--color-p1)',
                width: width || 'auto',
                padding: padding || '8px 20px',
                margin: margin || 0,
                marginTop: marginTop || 0,
                marginBottom: marginBottom || 0,
                marginLeft: marginLeft || 0,
                marginRight: marginRight || 0,
                borderRadius: 1,
                fontFamily: fontFamily || 'var(--font-p2)',
                fontSize: buttonFontSize || 'var(--font-size-p3)',
                fontWeight: fontWeight || 'bold',
                textTransform: 'uppercase',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
                border: 'none',
                '&:hover': {
                    backgroundColor: backgroundColor ? adjustBrightness(backgroundColor, -20) : '',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                },
                '&:active': {
                    transform: 'translateY(1px)',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                },
                '&:focus': {
                    outline: 'none',
                    border: 'none',
                },
            } }
        >
            { text }
        </Button>
    );
};

export default CustomButton;
