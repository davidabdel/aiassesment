import { AuditInputs } from '../types';

const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/YaalPPYLvgFNpGoyTfuq/webhook-trigger/0780fbcf-5ef2-46fa-96dc-74750232412e';

export const sendToWebhook = async (data: AuditInputs) => {
    try {
        // We use fetch with 'no-cors' mode if needed, but usually webhooks accept POST.
        // However, for standard JSON webhooks, we want to see the response if possible.
        // LeadConnector webhooks usually support CORS or are server-side. 
        // Since this is a client-side app, we'll try a standard POST.

        const payload = {
            ...data,
            submittedAt: new Date().toISOString(),
            source: 'AI Time Leak Audit App'
        };

        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.warn('Webhook submission failed:', response.statusText);
        } else {
            console.log('Webhook submitted successfully');
        }
    } catch (error) {
        console.error('Error sending to webhook:', error);
        // We don't throw here to avoid blocking the user flow if the webhook fails
    }
};

const RESULTS_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/YaalPPYLvgFNpGoyTfuq/webhook-trigger/a7737ad2-fcb6-4fd7-8570-f7e92fe7d4cb';

export const sendResultsWebhook = async (inputs: AuditInputs, results: any) => {
    try {
        const payload = {
            ...inputs,
            ...results,
            submittedAt: new Date().toISOString(),
            source: 'AI Time Leak Audit App - Results'
        };

        const response = await fetch(RESULTS_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.warn('Results webhook submission failed:', response.statusText);
        } else {
            console.log('Results webhook submitted successfully');
        }
    } catch (error) {
        console.error('Error sending results to webhook:', error);
    }
};

