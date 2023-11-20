import { NOT_VALID_TEMPLATE } from 'consts/templates';
import { ETemplates } from 'types/templates';

const templates = [
  ETemplates.LIST_RELATED_PRODUCTS,
  ETemplates.GRID_VIEW,
  ETemplates.LIST_VIEW,
];

const getIsAnyTemplateInvalid = () =>
  templates.some(
    (template) => sessionStorage.getItem(template) === NOT_VALID_TEMPLATE,
  );

export default getIsAnyTemplateInvalid;
