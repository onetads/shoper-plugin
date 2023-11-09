import { CUSTOM_POSTFIX } from 'consts/common';

const createCustomClassName = (classname: string) => classname + CUSTOM_POSTFIX;

export default createCustomClassName;
