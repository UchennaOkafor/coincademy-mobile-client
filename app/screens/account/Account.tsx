import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Clock, } from 'react-native-feather';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from 'styles/Index';
import { useUserStore } from 'state/useUserStore';

const Account = (): JSX.Element => {
  const navigation = useNavigation();
  const state = useUserStore();

  const hasImage = true;
  const imageSize = 75;

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 5, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{  }}>
          <Text style={{ ...Theme.typography.text.h3 }}>Timmy Thick</Text>
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
        style={{ width: '100%', height: 3, borderRadius: 2 }}
        colors={[Theme.colors.orange, Theme.colors.purple]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}} 
      />
      
      <View style={styles.emptyContainer}>
        <Image
          resizeMode="contain"
          style={{ width: '100%', height: 90, marginBottom: Theme.spacing.spacing2XL }} 
          source={require('@assets/images/zen.png')}
        />
        <Text style={{ ...Theme.typography.text.h6, ...Theme.typography.weight.normal, color: Theme.colors.gray }}>
          Nothing to see here...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Theme.spacing.spacingM,
    backgroundColor: Theme.colors.backgroundGray,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: Theme.radius.extraSmall, 
    borderStyle: 'dashed', 
    borderWidth: 1.8, 
    borderColor: Theme.colors.backgroundGrayDark,
    marginVertical: Theme.spacing.spacingL
  },
});

export default Account;
