import Image from 'next/image';
import {
	Button,
	H6,
	IconInfo,
	neutralColors,
	P,
} from '@giveth/ui-design-system';
import styled from 'styled-components';

import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { Flex, FlexCenter } from '@/components/styled-components/Flex';
import { Shadow } from '@/components/styled-components/Shadow';
import DiscordIcon from '/public/images/icons/social/discord.svg';
import LinkedinIcon from '/public/images/icons/social/Linkedin.svg';
import { ContentSeparator, BtnContainer } from './VerificationIndex';
import { useVerificationData } from '@/context/verification.context';
import { client } from '@/apollo/apolloClient';
import { SEND_NEW_SOCIAL_MEDIA } from '@/apollo/gql/gqlVerification';
import { RemoveButton } from './common';
import { gToast, ToastType } from '@/components/toasts';
import { ISocialProfile } from '@/apollo/types/types';

async function handleSocialSubmit(
	socialNetwork: string,
	hasSocialData: boolean,
	id?: number,
) {
	if (hasSocialData) {
		if (id) {
			const res = await client.mutate({
				mutation: SEND_NEW_SOCIAL_MEDIA,
				variables: {
					socialNetwork,
					projectVerificationId: id,
				},
			});
			console.log('Res', res);
			window.open(res.data.addNewSocialProfile, '_blank');
		}
	} else {
		gToast(`You already connected a ${socialNetwork} profile`, {
			type: ToastType.INFO_PRIMARY,
			position: 'top-center',
		});
	}
}

const SocialProfile = () => {
	const { setStep } = useVerificationData();
	const { verificationData } = useVerificationData();
	const router = useRouter();
	console.log('Router', router.query);

	const findSocialMedia = useCallback(
		(socialName: string): ISocialProfile | undefined => {
			const res = verificationData?.socialProfiles?.find(
				socialProfile => socialProfile.socialNetwork === socialName,
			);
			return res;
		},
		[verificationData],
	);

	const discordData = useMemo(
		() => findSocialMedia('discord'),
		[findSocialMedia],
	);

	const linkedinData = useMemo(
		() => findSocialMedia('linkedin'),
		[findSocialMedia],
	);

	return (
		<>
			<div>
				<H6 weight={700}>Personal Social Media</H6>
				<Description>
					<IconInfo color={neutralColors.gray[700]} />
					Please connect to your personal social media profiles. At
					least one is required.
				</Description>
				<ButtonsSection>
					{/* <ButtonRow>
						<ButtonSocial color='#00ACEE'>
							<IconTwitter />
							@LAURENLUZ
						</ButtonSocial>
						<RemoveButton />
					</ButtonRow>
					<ButtonRow>
						<ButtonSocial color='#3B5998'>
							<Image src={FacebookIcon} alt='facebook icon' />
							@LAURENLUZ
						</ButtonSocial>
						<RemoveButton />
					</ButtonRow>
					<ButtonRow>
						<ButtonSocial color='#CD486B'>
							<Image src={InstagramIcon} alt='instagram icon' />
							@LAURENLUZ
						</ButtonSocial>
						<RemoveButton />
					</ButtonRow>
					<ButtonRow>
						<ButtonSocial color='#F7003B'>
							<Image src={YoutubeIcon} alt='youtube icon' />
							CONNECT TO YOUTUBE
						</ButtonSocial>
					</ButtonRow> */}
					<ButtonRow>
						<ButtonSocial
							color='#7700D5'
							onClick={() => {
								handleSocialSubmit(
									'discord',
									discordData === undefined,
									Number(verificationData?.id),
								);
							}}
						>
							<Image src={DiscordIcon} alt='discord icon' />
							{discordData?.socialNetworkId ??
								'CONNECT TO DISCORD'}
						</ButtonSocial>
						{discordData?.socialNetworkId && <RemoveButton />}
					</ButtonRow>
					<ButtonRow>
						<ButtonSocial
							color='#0077B5
							'
							onClick={() => {
								handleSocialSubmit(
									'linkedin',
									linkedinData === undefined,
									Number(verificationData?.id),
								);
							}}
						>
							<Image src={LinkedinIcon} alt='discord icon' />
							{linkedinData?.socialNetworkId ??
								'CONNECT TO LINKEDIN'}
						</ButtonSocial>
						{linkedinData?.socialNetworkId && <RemoveButton />}
					</ButtonRow>
				</ButtonsSection>
			</div>
			<div>
				<ContentSeparator />
				<BtnContainer>
					<Button onClick={() => setStep(1)} label='<     PREVIOUS' />
					<Button onClick={() => setStep(3)} label='NEXT     >' />
				</BtnContainer>
			</div>
		</>
	);
};

const ButtonRow = styled(Flex)`
	gap: 8px;
`;

const ButtonsSection = styled.div`
	> div {
		margin-top: 24px;
	}
`;

const ButtonSocial = styled(FlexCenter)<{ color?: string }>`
	border-radius: 48px;
	background: white;
	height: 48px;
	box-shadow: ${Shadow.Giv[400]};
	color: ${props => props.color || 'inherit'};
	font-size: 12px;
	font-weight: 700;
	gap: 9px;
	width: fit-content;
	padding: 0 24px;
	cursor: pointer;
`;

const Description = styled(P)`
	display: flex;
	margin-top: 24px;
	align-items: center;
	gap: 10px;
	color: ${neutralColors.gray[700]};
	> :first-child {
		flex-shrink: 0;
	}
`;

export default SocialProfile;
