import { H6, Lead, semanticColors } from '@giveth/ui-design-system';
import React, { useState } from 'react';
import styled from 'styled-components';
import CheckBox from '@/components/Checkbox';
import { FlexCenter } from '@/components/styled-components/Flex';
import { Relative } from '@/components/styled-components/Position';

export default function TermsAndConditions() {
	const [accepted, setAccepted] = useState(false);
	return (
		<Lead>
			<H6 weight={700}>Terms & Conditions</H6>
			<TermItemsContainer>
				<Relative>
					<BulletCircle />
					<TermItem>
						I pledge that funds raised will be used for public
						benefit, not for personal gain.
					</TermItem>
				</Relative>
				<Relative>
					<BulletCircle />
					<TermItem>
						We understand that Giveth will be analyzing all
						donations looking for fraud or abuse. If there is any
						reason to suspect abuse, we understand that we may lose
						our verified status, our donors may not receive GIVbacks
						and that Giveth may share any evidence of fraud
						publicly.
					</TermItem>
				</Relative>
				<Relative>
					<BulletCircle />
					<TermItem>
						We will only accept new, external donations through
						Giveth, and we understand that if we are found to be
						recirculating our own funds through Giveth this will be
						considered abuse of the system.
						<SubTermItem>
							Only “first touch” donations count for GIVbacks. If
							your project receives funding from outside of Giveth
							and is found to be circulating these donations
							within the Giveth platform to receive GIVbacks, you
							will be disqualified.
						</SubTermItem>
					</TermItem>
				</Relative>
			</TermItemsContainer>
			<CheckBox
				title='I accept all of the Giveth community terms and conditions.'
				checked={accepted}
				onChange={setAccepted}
			/>
		</Lead>
	);
}

const TermItemsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 40px;
	margin-bottom: 87px;
	margin-top: 50px;
`;

const TermItem = styled.div`
	padding-left: 23px;
`;

const SubTermItem = styled.div`
	margin-top: 10px;
`;

const BulletCircle = styled(FlexCenter)`
	border-radius: 50%;
	border: 4px solid ${semanticColors.jade[100]};
	background: ${semanticColors.jade[500]};
	top: 8px;
	position: absolute;
	width: 14px;
	height: 14px;
`;
