import Image from 'next/image';
import { brandColors, neutralColors } from '@giveth/ui-design-system';
import styled from 'styled-components';
import SearchIcon from '/public/images/search.svg';

const SearchBox = (props: {
	onChange: (e: string) => void;
	placeholder?: string;
	value: string;
}) => {
	const { onChange, placeholder, value } = props;

	return (
		<Wrapper>
			<Input
				onChange={e => onChange(e.target.value)}
				placeholder={placeholder || 'Search ...'}
				value={value}
			/>
			<Border />
			<div style={{ flexShrink: 0 }}>
				<Image src={SearchIcon} alt='Search Icon' />
			</div>
		</Wrapper>
	);
};

const Border = styled.div`
	border-right: 1px solid ${neutralColors.gray[400]};
	margin-right: 10px;
	margin-left: 10px;
	height: 22px;
`;

const Input = styled.input`
	border-width: 0;
	height: 100%;
	width: 100%;
	font-weight: inherit;
	background: inherit;
	font-family: inherit;

	&:focus {
		outline: none;
	}

	&::placeholder {
		color: ${neutralColors.gray[500]};
	}
`;

const Wrapper = styled.div`
	min-width: 150px;
	width: 100%;
	height: 54px;
	border: 2px solid ${neutralColors.gray[300]};
	border-radius: 8px;
	padding: 5px 16px;
	display: flex;
	align-items: center;
	margin: 0 auto;
	background: white;

	&:focus-within {
		border: 2px solid ${brandColors.giv[600]};
	}
`;

export default SearchBox;
