import React, {memo, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import equals from 'react-fast-compare';
import { Check, X } from 'react-native-feather';
import TouchableSurface from 'components/TouchableSurface';
import { MultipleChoiceQuestionSlide } from 'codegen/models/MultipleChoiceQuestionSlide';
import { Choice } from 'codegen/models/Choice';
import { Theme } from 'styles/Index';

interface Props {
  item: MultipleChoiceQuestionSlide;
  onSelectionChanged: (id: string) => void;
  revealAnswer: boolean;
}

interface HighlightedChoiceProps {
  id: string, 
  action: 'correct' | 'wrong'
}

const MultipleChoiceQuestion = (props: Props): JSX.Element => {
  const [randomizedChoices] = useState(randomizeChoices(props.item.correctAnswer, props.item.falseAnswers));
  const [checkedIndex, setCheckedIndex] = useState(-1);
  const [selectedAnswerId, setSelectedAnswerId] = useState('');
  const [highlightedChoices, setHighlightedChoices] = useState<HighlightedChoiceProps[]>([]);

  useEffect(() => {
    if (! props.revealAnswer) {
      setHighlightedChoices([]);
      return;
    }

    const choices = [{ id: props.item.correctAnswer.id, action: 'correct' }];
    if (selectedAnswerId !== props.item.correctAnswer?.id) {
      choices.push({id: selectedAnswerId, action: 'wrong'});
    }

    setHighlightedChoices(choices);
  }, [props.revealAnswer]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.item.title}</Text>
      <Text style={styles.interactionHint}>Tap the correct answer</Text>
      {randomizedChoices.map((choice: Choice, index: number) => {
        const options = { 
          backgroundColor: getIconBackgroundColor(choice),
          borderColor: getBorderColor(choice, index)
        };

        return (
          <View key={choice.id} style={[styles.outerContainer, { borderColor: options.borderColor }]}>
            <TouchableSurface disabled={props.revealAnswer} onPress={() => {
              setCheckedIndex(index);
              props.onSelectionChanged(choice.id);
              setSelectedAnswerId(choice.id);
            }}>
              <View style={styles.innerContainer}>
                <Text style={styles.choiceTitle}>{choice.title}</Text>
                {isSelected(choice) && (
                  <View style={[styles.iconContainer, { backgroundColor: options.backgroundColor }]}>
                    {renderChoiceIcon(choice)}
                  </View>
                )}
              </View>
            </TouchableSurface>
          </View>
        );
      })}
    </View>
  );

  function getBorderColor(choice: Choice, currentIndex: number) {
    for (let element of highlightedChoices) {
      if (element.id === choice.id) {
        return element.action === 'correct' ? Theme.colors.green : Theme.colors.red;
      }
    }

    return checkedIndex === currentIndex ? Theme.colors.blue : Theme.colors.white;
  }

  function getIconBackgroundColor(choice: Choice) {
    for (let element of highlightedChoices) {
      if (element.id === choice.id) {
        return element.action === 'correct' ? Theme.colors.green : Theme.colors.red;
      }
    }

    return undefined;
  }

  function isSelected(choice: Choice) {
    for (let element of highlightedChoices) {
      if (element.id === choice.id) {
        return true;
      }
    }

    return false;
  }

  function renderChoiceIcon(choice: Choice) {
    for (let element of highlightedChoices) {
      if (element.id === choice.id) {
        const Icon = element.action === 'correct' ? Check : X;

        return (
          <Icon
            stroke={Theme.colors.white}
            fill={Theme.colors.transparent}
            strokeWidth={1.8}
            width={22}
            height={22}
          />
        );
      }
    }

    return null;
  }

  function randomizeChoices(correctChoice?: Choice, falseChoices?: Choice[]) {
    return [correctChoice, ...falseChoices ?? []].sort(() => Math.random() - 0.5);
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.spacingM
  },
  title: {
    ...Theme.typography.text.h4
  },
  interactionHint: {
    ...Theme.typography.text.h7, 
    ...Theme.typography.weight.normal, 
    color: Theme.colors.grayDark, 
    marginTop: Theme.spacing.spacingL, 
    marginBottom: Theme.spacing.spacingM, 
  },
  choiceTitle: {
    ...Theme.typography.text.h6, 
    ...Theme.typography.weight.medium 
  },
  outerContainer: {
    overflow: 'hidden', 
    borderRadius: Theme.radius.normal,
    backgroundColor: Theme.colors.transparent,
    marginVertical: Theme.spacing.spacing2XS + Theme.spacing.spacing3XS,
    borderWidth: 1.8,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.spacingXS,
    paddingHorizontal: Theme.spacing.spacingL,
    backgroundColor: Theme.colors.white,
    height: 48,
  },
  iconContainer: {
    width: 28, 
    height: 28,
    borderRadius: 28 / 2, 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});

export default memo(MultipleChoiceQuestion, equals);