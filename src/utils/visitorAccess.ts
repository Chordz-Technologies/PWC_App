import AsyncStorage from '@react-native-async-storage/async-storage';

// REFERRAL LIMIT

export const canAddReferral =
    async () => {

        const role =
            await AsyncStorage.getItem(
                'role'
            );

        if (role !== 'VISITOR') {

            return true;
        }

        const count =
            Number(
                await AsyncStorage.getItem(
                    'referralCount'
                )
            ) || 0;

        return count < 3;
    };

// MEETING LIMIT

export const canAddMeeting =
    async () => {

        const role =
            await AsyncStorage.getItem(
                'role'
            );

        if (role !== 'VISITOR') {

            return true;
        }

        const count =
            Number(
                await AsyncStorage.getItem(
                    'meetingCount'
                )
            ) || 0;

        return count < 2;
    };

// INCREMENT REFERRAL

export const increaseReferralCount =
    async () => {

        const count =
            Number(
                await AsyncStorage.getItem(
                    'referralCount'
                )
            ) || 0;

        await AsyncStorage.setItem(
            'referralCount',
            String(count + 1)
        );
    };

// INCREMENT MEETING

export const increaseMeetingCount =
    async () => {

        const count =
            Number(
                await AsyncStorage.getItem(
                    'meetingCount'
                )
            ) || 0;

        await AsyncStorage.setItem(
            'meetingCount',
            String(count + 1)
        );
    };