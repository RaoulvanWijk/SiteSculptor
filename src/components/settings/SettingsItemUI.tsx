import React from 'react'
import Dropdown from '../interactives/Dropdown';
import { Radio } from 'lucide-react';
import RadioMenu from '../interactives/RadioMenu';
import Link from 'next/link';
import InputField from '../interactives/InputField';
import "@/resources/styling/components/settings/settingsItemUI.scss"

type uiType =
    | "dropdown"
    | "radio"
    | "link"
    | "input"

interface SettingsItemUIProps {
    itemName?: string,
    itemDesc?: string,
    type: uiType,
    items?: string[],
    linkto?: string,
    placeholder?: string,
    def?: string,
    onclick_function?: (theme: string) => void;
}

const SettingsItemUI = ({ itemName, itemDesc, type, items, linkto, placeholder, def, onclick_function }: SettingsItemUIProps) => {
    let SettingsItemUILayout;

    switch (type) {
        case 'dropdown':
            SettingsItemUILayout = (
                <div className="sm-col">
                    <h3>{itemName}</h3>
                    <hr />
                    <div className="sm-row">
                        <p>{itemDesc}</p>
                        <Dropdown items={items || [""]} defaultSelected={def} />
                    </div>
                </div>
            )
            break;
        case 'radio':
            SettingsItemUILayout = (
                <div className="sm-col">
                    <h3>{itemName}</h3>
                    <hr />
                    <div className="sm-row">
                        <p>{itemDesc}</p>
                        <RadioMenu items={items || [""]}  defaultSelectedItem={def} themeSetter={onclick_function} />
                    </div>
                </div>
            )
            break;
        case 'link':
            SettingsItemUILayout = (
                <div className="sm-col">
                    <h3>{itemName}</h3>
                    <hr />
                    <div className="sm-row">
                        <p>{itemDesc}</p>
                        <div className="settings-button"><Link href={linkto || ""} />{placeholder}</div>
                    </div>
                </div>
            )
            break;
        case 'input':
            SettingsItemUILayout = (
                <div className="sm-col">
                    <h3>{itemName}</h3>
                    <hr />
                    <div className="sm-row">
                        <p>{itemDesc}</p>
                        <InputField placeholder={placeholder || ''} />
                    </div>
                </div>
            )
            break;
    }

    return SettingsItemUILayout;
}
export default SettingsItemUI;