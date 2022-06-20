import React, { FC } from 'react';
import styled from 'styled-components';
import { B, brandColors, neutralColors } from '@giveth/ui-design-system';
import { EVerificationStatus } from '@/apollo/types/types';
import { Flex } from '@/components/styled-components/Flex';
import VerificationBadge from '@/components/VerificationBadge';
import ExternalLink from '@/components/ExternalLink';
import links from '@/lib/constants/links';

interface IProps {
	status?: EVerificationStatus;
}

const VerificationStatus: FC<IProps> = ({ status }) => {
	if (!status || status === EVerificationStatus.DRAFT) return null;

	return (
		<Container>
			<Status>
				<B>Verify status</B>
				<VerificationBadge simplified status={status} />
			</Status>
			<ExternalLink href={links.DISCORD_SUPPORT}>
				<Contact>Please contact support team</Contact>
			</ExternalLink>
		</Container>
	);
};

const Contact = styled.div`
	color: ${brandColors.giv[900]};
	margin-top: 16px;
	text-align: center;
	font-size: 12px;
`;

const Status = styled(Flex)`
	justify-content: space-between;
	> :first-child {
		color: ${neutralColors.gray[600]};
	}
`;

const Container = styled.div`
	border-radius: 12px;
	border: 1px solid ${neutralColors.gray[300]};
	padding: 8px;
`;

export default VerificationStatus;
