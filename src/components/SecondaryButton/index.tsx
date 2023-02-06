import {memo} from 'react';

import Button from '../Button';
import {Color} from '../../theme';

import type {PropsWithChildren} from 'react';
import type {ButtonProps} from '../Button';

export interface SecondaryButtonProps extends ButtonProps {
  isVariant?: boolean;
}

function SecondaryButton({
  isVariant = false,
  ...props
}: PropsWithChildren<SecondaryButtonProps>): JSX.Element {
  const backgroundColor = isVariant ? Color.SECONDARY_VARIANT : Color.SECONDARY;
  return <Button {...props} style={{backgroundColor}} />;
}

export default memo(SecondaryButton);
