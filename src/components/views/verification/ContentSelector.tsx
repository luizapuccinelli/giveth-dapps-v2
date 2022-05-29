import { FC } from 'react';
import BeforeStart from '@/components/views/verification/BeforeStart';
import PersonalInfo from '@/components/views/verification/PersonalInfo';
import SocialProfile from '@/components/views/verification/SocialProfile';
import ProjectRegistry from './ProjectRegistry';
import ProjectContact from './ProjectContact';

interface IContentSelector {
	step: number;
}

const ContentSelector: FC<IContentSelector> = ({ step }) => {
	switch (step) {
		case 0:
			return <BeforeStart />;
		case 1:
			return <PersonalInfo />;
		case 2:
			return <SocialProfile />;
		case 3:
			return <ProjectRegistry />;
		case 4:
			return <ProjectContact />;
		default:
			return null;
	}
};

export default ContentSelector;
