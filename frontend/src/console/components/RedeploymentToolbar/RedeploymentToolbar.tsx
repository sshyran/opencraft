import * as React from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { WrappedMessage } from 'utils/intl';
import { Button, Modal } from 'react-bootstrap';
import {
  CustomStatusPill,
  NotificationToast,
  PublishButton
} from 'ui/components';
import { DeploymentInfoModel } from 'console/models';
import {
  OpenEdXInstanceDeploymentStatusStatusEnum as DeploymentStatus,
  OpenEdXInstanceDeploymentStatusDeploymentTypeEnum as DeploymentType
} from 'ocim-client';
import messages from './displayMessages';
import './styles.scss';

interface Props {
  deployment?: DeploymentInfoModel;
  cancelRedeployment: Function;
  performDeployment: Function;
  loading: boolean;
}

export const RedeploymentToolbar: React.FC<Props> = ({
  deployment,
  cancelRedeployment,
  performDeployment,
  loading
}: Props) => {
  const [show, setShow] = React.useState(false);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);
  const { trackEvent } = useMatomo();

  // Deployment notification handler
  const [notificationIsVisible, showNotification] = React.useState(false);
  const toggleNotification = () => showNotification(!notificationIsVisible);

  let deploymentDisabled: boolean = true;
  let cancelDeploymentDisabled: boolean = true;
  let undeployedChanges: number = 0;
  let deploymentStatus: DeploymentStatus | null = null;
  let deploymentType: DeploymentType | null = null;

  const performDeploymentHandler = () => {
    if (!deploymentDisabled) {
      trackEvent({
        category: 'deployment',
        action: 'click-deploy',
        name: 'Deploy'
      });
      performDeployment();

      // Show the deployment notification
      toggleNotification();
    }
  };

  if (deployment) {
    deploymentStatus = deployment.status;
    undeployedChanges = deployment.undeployedChanges.length;
    deploymentType = deployment.deploymentType;
    /**
     * The user can't trigger a deployment when:
     * 1. There's a pending request.
     * 2. The instance is being prepared.
     * 3. There are no new changes to deploy.
     * 4. There's already a provisioning running.
     */
    deploymentDisabled =
      loading ||
      !undeployedChanges ||
      deploymentStatus === DeploymentStatus.Preparing;

    /**
     * The user can't cancel a deployment when:
     * 1. There's a pending request.
     * 2. There's no provisioning running.
     * 3. There's a provisionin running, but it wasn't triggered
     *    by the user.
     */
    cancelDeploymentDisabled =
      loading ||
      deploymentStatus !== DeploymentStatus.Provisioning ||
      (deploymentStatus === DeploymentStatus.Provisioning &&
        deploymentType !== DeploymentType.User);
  }

  const cancelDeploymentHandler = cancelDeploymentDisabled
    ? undefined
    : handleShowModal;

  return (
    <div className="d-flex justify-content-center align-middle redeployment-toolbar">
      <div className="redeployment-nav">
        <CustomStatusPill
          loading={loading}
          redeploymentStatus={deploymentStatus}
          deploymentType={deploymentType}
          cancelRedeployment={cancelDeploymentHandler}
        />
        <PublishButton
          deploymentHandler={performDeploymentHandler}
          undeployedChanges={undeployedChanges}
          deploymentDisabled={deploymentDisabled}
        />
      </div>

      <Modal
        show={show}
        onHide={handleCloseModal}
        className="cancel-redeployment-modal"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <p>
              <WrappedMessage
                id="cancelDeploymentConfirm"
                messages={messages}
              />
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WrappedMessage
            id="cancelDeploymentConfirmText"
            messages={messages}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            size="lg"
            onClick={handleCloseModal}
          >
            <WrappedMessage id="closeModalButton" messages={messages} />
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              cancelRedeployment();
              handleCloseModal();
            }}
          >
            <WrappedMessage id="confirmCancelDeployment" messages={messages} />
          </Button>
        </Modal.Footer>
      </Modal>
      <NotificationToast
        show={notificationIsVisible}
        onClose={toggleNotification}
        delay={4000}
        autohide
        bodyMessageId="notificationBody"
        closeMessage={messages.notificationHelp.defaultMessage}
        messages={messages}
      />
    </div>
  );
};
