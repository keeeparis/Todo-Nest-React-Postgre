import { FC, HtmlHTMLAttributes } from 'react'

export const StopPropagationComponent:FC<HtmlHTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
    return (
        <div 
            {...props} 
            onClick={e => e.stopPropagation()} 
            style={{ width: 'fit-content' }}
        >
            {children}
        </div>
    )
}