import { DropdownDirection } from '../../../types/ui';
import cls from './popup.module.scss';

export const mapDirectonClass: Record<DropdownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top left': cls.optionsTopLeft,
  'top right': cls.optionsTopRight,
};
