import {memo} from 'react';

import Button from '../Button';
import {Color} from '../../theme';

import type {ButtonProps} from '../Button';

export interface PrimaryButtonProps extends ButtonProps {
  isVariant?: boolean;
}

function PrimaryButton({
  isVariant = false,
  ...props
}: PrimaryButtonProps): JSX.Element {
  const backgroundColor = isVariant ? Color.PRIMARY_VARIANT : Color.PRIMARY;
  return <Button {...props} style={{backgroundColor}} />;
}

export default PrimaryButton;
