import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { useState, useRef, SyntheticEvent } from 'react';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	ArticleStateType,
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
	articleState: ArticleStateType;
	setArticleState: (params: any) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false);
	const formRef = useRef<HTMLFormElement | null>(null);

	const toggleOpen = () => {
		setOpen((prevOpen) => !prevOpen);
	};
	const [newFont, setNewFont] = useState(articleState.fontFamilyOption);

	const [newFontSizeOption, setNewFontSizeOption] = useState(
		articleState.fontSizeOption
	);

	const [newFontColor, setNewFontColor] = useState(articleState.fontColor);

	const [newBackgroundColor, setNewBackgroundColor] = useState(
		articleState.backgroundColor
	);

	const [newContentWidth, setNewContentWidth] = useState(
		articleState.contentWidth
	);

	useCloseForm({
		isOpen: isOpen,
		onClose: toggleOpen,
		rootRef: formRef,
	});

	// функция сабмита формы
	const formSubmitHandler = (e: SyntheticEvent) => {
		e.preventDefault();
		setArticleState({
			...articleState,
			fontFamilyOption: newFont,
			fontColor: newFontColor,
			backgroundColor: newBackgroundColor,
			contentWidth: newContentWidth,
			fontSizeOption: newFontSizeOption,
		});
	};

	// функция сброса состояния статьи и формы к начальному
	const returnToDefaultState = () => {
		setArticleState({
			...articleState,
			fontColor: defaultArticleState,
			fontFamilyOption: defaultArticleState,
			backgroundColor: defaultArticleState,
			contentWidth: defaultArticleState,
			fontSizeOption: defaultArticleState,
		});
		setNewFont(defaultArticleState.fontFamilyOption);
		setNewFontSizeOption(defaultArticleState.fontSizeOption);
		setNewFontColor(defaultArticleState.fontColor);
		setNewBackgroundColor(defaultArticleState.backgroundColor);
		setNewContentWidth(defaultArticleState.contentWidth);
	};

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
					onSubmit={formSubmitHandler}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={newFont}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						title='шрифт'
						onChange={setNewFont}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={newFontSizeOption}
						title='размер шрифта'
						onChange={setNewFontSizeOption}
					/>
					<Select
						selected={newFontColor}
						options={fontColors}
						placeholder='Выберите цвет'
						title='цвет шрифта'
						onChange={setNewFontColor}
					/>
					<Separator />
					<Select
						selected={newBackgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет'
						title='Цвет фона'
						onChange={setNewBackgroundColor}
					/>
					<Select
						selected={newContentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину'
						title='ширина контента'
						onChange={setNewContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={returnToDefaultState}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
