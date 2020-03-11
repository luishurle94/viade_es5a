import React from 'react';
import { Uploader } from '@inrupt/solid-react-components';
import { Trans, useTranslation } from 'react-i18next';
import {
  WelcomeWrapper,
  WelcomeCard,
  WelcomeLogo,
  WelcomeProfile,
  WelcomeDetail,
  WelcomeName,
  ImageWrapper
} from './welcome.style';
import { ImageProfile } from '@components';
import { errorToaster } from '@utils';

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const WelcomePageContent = props => {
  const { webId, image, updatePhoto, name } = props;
  const { t } = useTranslation();
  const limit = 2100000;
  const imgLogoStyle = {
    'maxHeight': '250px',
    'maxWidth': '250px'
  };
  return (
    <WelcomeWrapper data-testid="welcome-wrapper">
      <WelcomeCard className="card">
        <WelcomeLogo data-testid="welcome-logo">
          <img src="/img/viade_500.png" alt="ViaDe" style={imgLogoStyle} />
        </WelcomeLogo>
        <WelcomeProfile data-testid="welcome-profile">
          <h3>
            {t('welcome.welcome')}, <WelcomeName>{name}</WelcomeName>
          </h3>
          <ImageWrapper>
            <Uploader
              {...{
                fileBase: webId && webId.split('/card')[0],
                limitFiles: 1,
                limitSize: limit,
                accept: 'jpg,jpeg,png',
                errorsText: {
                  sizeLimit: t('welcome.errors.sizeLimit', {
                    limit: `${limit / 1000000}Mbs`
                  }),
                  unsupported: t('welcome.errors.unsupported'),
                  maximumFiles: t('welcome.errors.maximumFiles')
                },
                onError: error => {
                  if (error && error.statusText) {
                    errorToaster(error.statusText, t('welcome.errorTitle'));
                  }
                },
                onComplete: uploadedFiles => {
                  updatePhoto(
                    uploadedFiles[uploadedFiles.length - 1].uri,
                    t('welcome.uploadSuccess'),
                    t('welcome.successTitle')
                  );
                },
                render: props => (
                  <ImageProfile
                    {...{
                      ...props,
                      webId,
                      photo: image,
                      text: t('welcome.upload'),
                      uploadingText: t('welcome.uploadingText')
                    }}
                  />
                )
              }}
            />
          </ImageWrapper>
        </WelcomeProfile>
      </WelcomeCard>
      <WelcomeCard className="card">
        <WelcomeDetail data-testid="welcome-detail">
          <Trans i18nKey="welcome.title">
            <h3>
              title
              <a
                href="https://github.com/inrupt/solid-react-sdk"
                target="_blank"
                rel="noopener noreferrer"
              >
                link
              </a>
            </h3>
          </Trans>
          <Trans i18nKey="welcome.description">
            <p>
              text
              <a
                href="https://github.com/solid/solid-spec"
                target="_blank"
                rel="noopener noreferrer"
              >
                link{' '}
              </a>{' '}
              text
            </p>
          </Trans>

          <Trans i18nKey="welcome.workingInProgress">
            <p>
              The project is working in progress. Take a look at the
              <a
                href="https://github.com/Arquisoft/viade_es5a"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github repository
              </a>
              for what’s been implemented as part of the previous releases, and what's currently
              planned.
            </p>
          </Trans>
          <h3>{t('welcome.contactUsTitle')}</h3>
          <Trans i18nKey="welcome.contactUsText">
            <p>
              If you have questions or you would like feedback about the ViaDe project please contact
              <a href="https://github.com/Arquisoft/viade_es5a/issues">Issues Viade_5a</a>.
            </p>

          </Trans>
          <Trans i18nKey="welcome.contactUsInruptText">
          <p>
              If you have additional questions about the use of Solid, inrupt’s brand, please contact
              <a href="mailto:support@inrupt.com">support@inrupt.com</a>.
            </p>
            </Trans>
        </WelcomeDetail>
      </WelcomeCard>
    </WelcomeWrapper>
  );
};
