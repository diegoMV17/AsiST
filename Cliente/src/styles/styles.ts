import { StyleSheet } from 'react-native';

const colors = {
    primary: '#00205B',
    accent: '#4CAF50',
    background: '#F5F7FA',
    inputBorder: '#E0E0E0',
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
    textLight: "#e2e8f0",
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
    primaryButton: {
    backgroundColor: "#1e3a8a",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#1e3a8a",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#1e3a8a",
    fontSize: 16,
    fontWeight: "600",
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

    headerSection: {
        backgroundColor: colors.primary, // ya tienes este color definido
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: "center",
        marginBottom: 20,
    },
    headerImage: {
        width: "100%",
        height: 200,
        marginBottom: 12,
        borderRadius: 12,
    },
    secondSubtitle: {
        fontSize: 18,
        color: colors.textLight,
        marginBottom: 4,
    },
    universityName: {
        fontSize: 16,
        color: colors.textSecondary,
        fontStyle: "italic",
    },
    welcomeText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#374151",
        textAlign: "center",
        fontWeight: "500",
    },
    section: {
        backgroundColor: "#ffffff",
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 20,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    footer: {
        backgroundColor: "#f3f4f6",
        paddingVertical: 24,
        paddingHorizontal: 20,
        alignItems: "center",
        marginTop: 20,
    },
    footerText: {
        fontSize: 14,
        color: "#374151",
        fontWeight: "500",
        marginBottom: 4,
    },
    footerSubtext: {
        fontSize: 12,
        color: "#6b7280",
        marginBottom: 8,
    },
    versionText: {
        fontSize: 10,
        color: "#9ca3af",
    },
    ctaSection: {
        backgroundColor: "#ffffff",
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 24,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    ctaTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: 12,
        textAlign: "center",
    },
    ctaText: {
        fontSize: 15,
        color: "#4b5563",
        textAlign: "center",
        lineHeight: 22,
    },
});

export default styles;
