import {Text, View} from 'react-native';

import {HeaderText, Screen, Switch} from '../../components';
import {useGameStore} from '../../state';
import styles from './styles';

function Settings() {
  const isPlayingComputer = useGameStore(state => state.isPlayingComputer);
  const setIsPlayingComputer = useGameStore(
    state => state.setIsPlayingComputer,
  );

  return (
    <Screen>
      <HeaderText>Game Settings</HeaderText>
      <Setting
        label="Play Against Computer"
        onValueChange={val => setIsPlayingComputer(val)}
        value={isPlayingComputer}
      />
    </Screen>
  );
}

interface SettingProps {
  label: string;
  onValueChange: (value: boolean) => void;
  value: boolean;
}

function Setting({label, onValueChange, value}: SettingProps) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.label}>{label}</Text>
      <Switch isEnabled={value} onChange={() => onValueChange(!value)} />
    </View>
  );
}

export default Settings;
