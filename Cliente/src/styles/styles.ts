import { StyleSheet } from 'react-native';

const colors = {
    primary: '#00205B',
    accent: '#4CAF50',
    background: '#F5F7FA',
    inputBorder: '#E0E0E0',
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
    error: '#DC2626',
    cardBackground: '#FFFFFF',
    shadow: '#000000',
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
        maxWidth: 400,
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 24,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        alignItems: 'center',
    },

    title: {
        fontSize: 26,
        marginBottom: 12,
        fontWeight: '700',
        color: colors.primary,
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: '500',
        color: colors.textSecondary,
        textAlign: 'center',
    },

    normalText: {
        fontSize: 16,
        color: colors.textPrimary,
        marginBottom: 10,
        fontWeight: '500',
        textAlign: 'center',
    },

    input: {
        borderWidth: 1,
        borderColor: colors.inputBorder,
        marginBottom: 12,
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        color: colors.textPrimary,
        backgroundColor: '#FFFFFF',
        width: '100%',
    },

    link: {
        color: colors.accent,
        fontSize: 16,
        marginTop: 12,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },

    button: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 8,
        minWidth: 180,
        shadowColor: colors.shadow,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    buttonText: {
        color: '#FFFFFF',
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
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#E5E7EB',
    },

    roleSelectorButtonActive: {
        backgroundColor: colors.accent,
    },

    roleSelectorButtonText: {
        color: colors.textPrimary,
        fontWeight: '600',
    },

    roleSelectorButtonTextActive: {
        color: '#FFFFFF',
    },

    dateInput: {
        borderWidth: 1,
        borderColor: colors.inputBorder,
        marginBottom: 12,
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        color: colors.textPrimary,
        backgroundColor: '#FFFFFF',
        width: '100%',
        justifyContent: 'center',
    },

    loadingText: {
        fontSize: 18,
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: 20,
    },

    vehicleItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.cardBackground,
        padding: 15,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: colors.shadow,
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%',
    },

    vehicleCard: {
        backgroundColor: colors.cardBackground,
        padding: 16,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: colors.shadow,
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },

    vehicleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
        color: colors.textPrimary,
    },

    vehicleDetails: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 2,
    },

    editButton: {
        backgroundColor: '#3B82F6',
        marginRight: 10,
    },

    deleteButton: {
        backgroundColor: '#EF4444',
    },

    buttonDisabled: {
        backgroundColor: '#94a3b8', // un gris azulado claro
        opacity: 0.7,
    },

    pickerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.inputBorder,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 12,
        backgroundColor: '#fff',
    },

    picker: {
        flex: 1,
        height: 50,
        color: colors.textPrimary,
    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: 6,
    },
    card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#0f172a',
  },
  cardText: {
    fontSize: 15,
    marginBottom: 2,
    color: '#334155',
  },

});

export default styles;
