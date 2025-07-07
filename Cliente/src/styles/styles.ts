import { Link } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const colors = {
    primary: '#00205B',
    accent: '#6DC067',
    background: '#FFFFFF',
    inputBorder: '#CCCCCC',
    textPrimary: '#333333',
    textSecondary: '#999999',
    error: '#D32F2F',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },

    formBox: {
        width: '100%',
        maxWidth: 520,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 28,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
        alignItems: 'center',
    },

    title: {
        fontSize: 24,
        marginBottom: 16,
        fontWeight: '700',
        color: colors.primary,
        textAlign: 'center', // Centra el texto
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: '600',
        color: colors.textSecondary,
        textAlign: 'center', // Centra el texto
    },
    normalText: {
        fontSize: 16,
        color: colors.textPrimary,
        marginBottom: 12,
        fontWeight: '600',
        textAlign: 'center', // Centra el texto
    },

    input: {
        borderWidth: 1,
        borderColor: colors.inputBorder,
        marginBottom: 12,
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        color: colors.textPrimary,
        backgroundColor: '#FAFAFA',
        width: '100%',
    },

    link: {
        color: colors.accent,
        fontSize: 16,
        marginTop: 12,
        textDecorationLine: 'underline',
        textAlign: 'center', // Centra el texto
    },

    button: {
        backgroundColor: colors.accent,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
        minWidth: 180,
    },

    buttonText: {
        color: colors.background,
        fontWeight: '600',
        fontSize: 16,
    },

    errorText: {
        color: colors.error,
        fontSize: 14,
        marginBottom: 8,
    },

    roleSelectorContainer: {
        width: '100%',
        marginBottom: 12,
    },

    roleSelectorLabel: {
        marginBottom: 4,
        color: colors.textPrimary,
        fontWeight: '600',
    },

    roleSelectorRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    roleSelectorButton: {
        flex: 1,
        marginHorizontal: 2,
        borderRadius: 6,
        paddingVertical: 8,
        alignItems: 'center',
        backgroundColor: '#eee',
    },

    roleSelectorButtonActive: {
        backgroundColor: colors.accent,
    },

    roleSelectorButtonText: {
        color: '#333',
        fontWeight: '600',
    },

    roleSelectorButtonTextActive: {
        color: '#fff',
    },

    dateInput: {
        borderWidth: 1,
        borderColor: colors.inputBorder,
        marginBottom: 12,
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        color: colors.textPrimary,
        backgroundColor: '#FAFAFA',
        width: '100%',
        justifyContent: 'center',
    },
});

export default styles;