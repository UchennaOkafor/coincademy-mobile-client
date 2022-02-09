import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from 'components/headers/Header';
import { Clock } from 'react-native-feather';
import TitleSectionHeader from 'components/headers/TitleSectionHeader';
import Badge from 'components/badge/Badge';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from 'styles/Index';

const Account = (): JSX.Element => {
  const navigation = useNavigation();
  const hasImage = true;
  const imageSize = 75;

  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 15, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{  }}>
          <Text style={{ ...Theme.typography.text.h3 }}>Elon Musk</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            {/* <Badge title="Beginner" primaryColor={Theme.colors.purple} /> */}
            <Clock
              stroke={Theme.colors.grayDark}
              fill={Theme.colors.transparent}
              width={16}
              height={16}
            />
            <Text style={{ marginLeft: 4, ...Theme.typography.text.h7, ...Theme.typography.weight.medium, color: Theme.colors.grayDark }}>Joined Yesterday</Text>
          </View>
        </View>
        {hasImage ? (
          <Image
            source={{uri: 'https://styles.redditmedia.com/t5_2th52/styles/communityIcon_wzrl8s0hx8a81.png'}} 
            style={{ width: imageSize, height: imageSize, borderRadius: imageSize / 2 }} 
          />
        ) : (
          <View 
            style={{ justifyContent: 'center', alignItems: 'center', width: imageSize, height: imageSize, borderRadius: imageSize / 2,  borderStyle: 'dashed', borderWidth: 2, borderColor: Theme.colors.purple }}>
              <Text style={{ ...Theme.typography.text.h3 }}>EM</Text>
          </View>
        )}
      </View>

      <LinearGradient
        style={{ width: '100%', height: 3, marginTop: 5, marginBottom: 30, borderRadius: 2 }}
        colors={[Theme.colors.orange, Theme.colors.purple]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}} />
      
      <TitleSectionHeader
        title="Statistics"
        style={{marginBottom: Theme.spacing.spacingS}}
      />
      <View style={styles.emptyContainer} />

      <View style={{ marginVertical: 15 }} /> 
      <TitleSectionHeader
        title="Progress"
        style={{marginBottom: Theme.spacing.spacingS}}
      />
      <View style={styles.emptyContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Theme.spacing.spacingM,
    backgroundColor: Theme.colors.backgroundGray
  },
  emptyContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
    height: 150, 
    borderRadius: Theme.radius.extraSmall, 
    borderStyle: 'dashed', 
    borderWidth: 1.8, 
    borderColor: Theme.colors.backgroundGrayDark
  },
});

export default Account;
