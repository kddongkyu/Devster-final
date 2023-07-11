import React from 'react';

function IconChatLogo({connected}) {
    return (
        <svg className={`chat-logo-icon ${connected ? 'moblie-logo-loaded' : ''}`} width="200" height="118" viewBox="0 0 200 118" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H200V117.241H0V0Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M186.667 10.6583H13.3333V106.583H186.667V10.6583ZM0 0V117.241H200V0H0Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M44.7137 38.8643L76.0944 63.9492L44.7137 89.034L35.2856 81.4975L57.2383 63.9492L35.2856 46.4008L44.7137 38.8643Z" fill="#721EA6" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M146.667 90.5958H80V79.9375H146.667V90.5958Z" fill="#721EA6" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M173.333 21.3165H26.6663V95.9247H173.333V21.3165ZM13.333 10.6582V106.583H186.666V10.6582H13.333Z" fill="#721EA6" />
        </svg>
    );
}

export default IconChatLogo;