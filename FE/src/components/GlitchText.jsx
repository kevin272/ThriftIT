import React, { useState, useRef, useEffect } from 'react';

// HackedText component definition
export const HackedText = ({
    text = "HYPERPLEXED",
    className = "",
    style = {},
    as: Tag = "span", // Allow changing the HTML tag, default to span
    ...props
}) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const [displayValue, setDisplayValue] = useState(text);
    const h1Ref = useRef(null);
    let intervalRef = useRef(null);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const handleMouseEnter = () => {
        let iteration = 0;
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            const originalValue = h1Ref.current.dataset.originalValue;
            const newText = displayValue
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalValue[index];
                    }
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");
            setDisplayValue(newText);
            if (iteration >= originalValue.length) {
                clearInterval(intervalRef.current);
            }
            iteration += 1 / 3;
        }, 30);
    };

    return (
        <Tag
            ref={h1Ref}
            data-original-value={text}
            onMouseEnter={handleMouseEnter}
            className={`font-mono cursor-pointer transition-colors duration-300 ${className}`}
            style={style}
            {...props}
        >
            {displayValue}
        </Tag>
    );
};
