import * as React from 'react';
import { Column, Colums, Wrapper } from './elements';
import { ConnectProps, connect } from '../../logic';
import Settings from '../Settings';
import DropArea from '../DropArea';
import Files from '../Files';
import Logo from '../Logo';
import { Classes, Button, Card } from '@blueprintjs/core';

type Props = ConnectProps & {};

class App extends React.PureComponent<Props> {
  public render() {
    const { app } = this.props;
    const hasFiles = true; //app.state.files.length > 0;
    return (
      <Wrapper>
        <Logo />
        <Colums className={Classes.DARK}>
          {hasFiles && (
            <Column>
              <Settings />
            </Column>
          )}
          <Column>
            {!hasFiles && (
              <Card>
                <DropArea />
              </Card>
            )}
            {hasFiles && <Files />}
            {hasFiles && (
              <Button
                loading={app.state.running}
                intent="primary"
                icon="cloud-download"
                large={true}
                onClick={this.processFiles}
              >
                Run
              </Button>
            )}
          </Column>
        </Colums>
      </Wrapper>
    );
  }

  private processFiles = async () => {
    this.props.app.actions.processAndDowloadZip();
  };
}

export default connect(App);
