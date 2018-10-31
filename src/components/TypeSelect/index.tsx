import * as React from 'react';
import { connect, ConnectProps } from '../../logic';
import { Wrapper, SelectItemAnim } from './elements';
import HoverProvider from '../HoverProvider';
import { OutputMimeType } from '../../logic/state';
import { ButtonGroup, Button } from '@blueprintjs/core';

type Props = ConnectProps;

const typeNames: { [K in OutputMimeType]: string } = {
  [OutputMimeType.jpeg]: 'JPEG',
  [OutputMimeType.png]: 'PNG',
  [OutputMimeType.webp]: 'WEBP',
};

class TypeSelect extends React.PureComponent<Props> {
  public render() {
    const { app } = this.props;
    return (
      <ButtonGroup>
        {[OutputMimeType.jpeg, OutputMimeType.png, OutputMimeType.webp].map(k => {
          const onClick = () => {
            this.onTypeSelected(k);
          };
          const selected = k === app.state.settings.type;
          return (
            <Button key={k} active={selected} onClick={onClick} disabled={app.state.running}>
              {typeNames[k]}
            </Button>
          );
        })}
      </ButtonGroup>
    );
  }

  private onTypeSelected = (type: OutputMimeType) => {
    this.props.app.actions.setSettingType(type);
  };
}

{
  /* <Wrapper>
{[OutputMimeType.jpeg, OutputMimeType.png, OutputMimeType.webp].map(k => {
  const onClick = () => {
    this.onTypeSelected(k);
  };
  const selected = k === app.state.settings.type;
  return (
    <HoverProvider key={k}>
      {hoverParams => (
        <SelectItemAnim
          pose={
            selected ? (hoverParams.hover ? 'hoverSelected' : 'selected') : hoverParams.hover ? 'hover' : 'init'
          }
          innerRef={hoverParams.ref as any}
          onClick={onClick}
        >
          {typeNames[k]}
        </SelectItemAnim>
      )}
    </HoverProvider>
  );
})}
</Wrapper> */
}

export default connect(TypeSelect);
