"use client"
import { useEffect, useState } from "react";
import { LoaderButton } from "../LoaderButton";

interface ButtonProps{
    keyProp?:string | undefined;
    cssClass: string;
    label: string;
    isReadOnly: boolean;
    onClick: () => void;
    iconStart?: any | undefined;
    iconEnd?:any | undefined;
    isLoading?: boolean;
}
export const Button = ({ cssClass, label, isReadOnly, onClick, keyProp = undefined, iconStart = undefined, iconEnd = undefined }: ButtonProps ) => {
    const [isLoad, setIsLoad] = useState(true);

    const handlerOnClick = () => {
        setIsLoad(true);
        onClick();
        setIsLoad(false);
    }

    useEffect(()=>{
        if(isLoad)
            setIsLoad(!isLoad);
    }, [isLoad]);
    return (
        <button
            key={keyProp ?? undefined}
            type="button"
            className={cssClass}
            aria-label={label}
            disabled={isReadOnly ? true : false}
            onClick={handlerOnClick}>
            {isLoad? (<LoaderButton/>) : (
                <span key={`span`+keyProp ?? undefined}>{ iconStart === undefined ? "" : iconStart } {label} { iconEnd === undefined ? "" : iconEnd }</span>
            )}
        </button>
    );
}