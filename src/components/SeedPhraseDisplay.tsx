import React from 'react';
import { TextComponent } from 'src/components/TextComponent';
import {
  SeedPhraseLayoutDisplay,
  seedPhraseLayoutDisplayWordThemedStyle,
} from 'src/components/SeedPhraseLayoutDisplay';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';

const placeholderWord = 'Octopus';
const placeholderSecuredWord = placeholderWord.split('').map(() => '*');

interface SeedPhraseDisplayProps {
  hide?: boolean;
  seedPhrase: string;
}

export const SeedPhraseDisplay: React.FC<SeedPhraseDisplayProps> = ({
  hide = false,
  seedPhrase,
}) => {
  const styles = useThemedStyle(seedPhraseLayoutDisplayWordThemedStyle);

  const seedPhraseWords = seedPhrase.split(' ');
  return (
    <SeedPhraseLayoutDisplay showIndex>
      {seedPhraseWords.map((word, idx) => (
        <TextComponent key={'sp-w-' + idx} style={styles.word}>
          {hide ? placeholderSecuredWord : word}
        </TextComponent>
      ))}
    </SeedPhraseLayoutDisplay>
  );
};
