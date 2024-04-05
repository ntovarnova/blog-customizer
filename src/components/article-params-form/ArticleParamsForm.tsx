import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { useState, useRef, FormEvent } from 'react';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	fontFamilyOptions,
} from 'src/constants/articleProps';
import { useCloseForm } from './hooks/useCloseForm';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	state: typeof defaultArticleState;
	setState: React.Dispatch<React.SetStateAction<typeof defaultArticleState>>;
	resetStyles: () => void;
	applyStyles: () => void;
};

export const ArticleParamsForm = ({
	state,
	setState,
	resetStyles,
	applyStyles,
}: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false);
	const formRef = useRef<HTMLFormElement | null>(null);

	const toggleOpen = () => {
		setOpen((prevOpen) => !prevOpen);
	};
	const handleChangeFontFamily = (value: OptionType) => {
		setState({ ...state, fontFamilyOption: value });
	};
	const handleChangeFontSize = (value: OptionType) => {
		setState({ ...state, fontSizeOption: value });
	};

	const handleChangeFontColor = (value: OptionType) => {
		setState({ ...state, fontColor: value });
	};

	const handleChangeBackgroundColor = (value: OptionType) => {
		setState({ ...state, backgroundColor: value });
	};

	const handleChangeContentWidth = (value: OptionType) => {
		setState({ ...state, contentWidth: value });
	};

	useCloseForm({
		isOpen: isOpen,
		onClose: toggleOpen,
		rootRef: formRef,
	});

	return (
		<>
			<ArrowButton onClick={() => !isOpen && toggleOpen()} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					ref={formRef}
					onSubmit={(e: FormEvent) => e.preventDefault()}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						title='шрифт'
						onChange={handleChangeFontFamily}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						title='размер шрифта'
						onChange={handleChangeFontSize}
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						placeholder='Выберите цвет'
						title='цвет шрифта'
						onChange={handleChangeFontColor}
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет'
						title='Цвет фона'
						onChange={handleChangeBackgroundColor}
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину'
						title='ширина контента'
						onChange={handleChangeContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset'onClick={resetStyles} />
						<Button title='Применить' type='submit' onClick={applyStyles}/>
					</div>
				</form>
			</aside>
		</>
	);
};
