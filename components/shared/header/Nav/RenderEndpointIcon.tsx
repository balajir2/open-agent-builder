import React from 'react';

export function RenderEndpointIcon({ icon: Icon, alwaysHeat, triggerOnHover, size, iconClassName }: any) {
    // If Icon is a component (function), render it. If it's an element, render it directly.
    if (typeof Icon === 'function') {
        return <Icon className={iconClassName} />;
    }
    return <span className={iconClassName}>{Icon}</span>;
}
