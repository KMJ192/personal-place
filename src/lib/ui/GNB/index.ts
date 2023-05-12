import Template from './Template/Template';
import Container from './Container/Container';
import MenuGroup from './MenuGroup/MenuGroup';
import Menu from './Menu/Menu';
import NextTemplate from './NextTemplate/Template';
import useGNBActions from './hooks/useGNBActions';
import useGNBStates from './hooks/useGNBStates';

const GNB = {
  Container,
  MenuGroup,
  Menu,
  Template,
  NextTemplate,
};

const useGNBHooks = {
  useGNBActions,
  useGNBStates,
};

export { useGNBHooks };
export default GNB;
