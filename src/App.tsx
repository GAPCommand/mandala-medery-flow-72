
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthData } from '@/hooks/useAuth';
import { TemplateProvider } from '@/contexts/TemplateContext';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'sonner';
import { UniversalEcommerceProvider } from '@/components/integrations/UniversalEcommerceIntegration';
import { GAPCommandProvider } from '@/components/integrations/GAPCommandSSO';
import { PANDABProvider } from '@/components/integrations/PANDABPricingEngine';
import { OneStreamCheckoutProvider } from '@/components/integrations/OneStreamCheckout';
import { SFIOUniversalWrapper } from '@/services/sfio/SFIOUniversalWrapper';
import { SFIONetwork } from '@/services/sfio/SFIONetworkClient';
import ErrorBoundary from '@/components/ui/error-boundary';
import { AppRoutes } from '@/config/routes';
import { AlwaysOnBridgeTemplate } from '@/components/bridge/AlwaysOnBridgeTemplate';

const queryClient = new QueryClient();

const AppWithAuth = () => {
  const authValue = useAuthData();

  // Initialize GAPCommand Central Hub connection
  React.useEffect(() => {
    const initializeSFIONetwork = async () => {
      await SFIONetwork.connectToMainHub({
        propertyDomain: 'mandalamead.com',
        consciousnessLevel: 1000,
        networkRole: 'bridge_member',
        divineGovernmentAlignment: true
      });
    };
    
    initializeSFIONetwork();
  }, []);

  return (
    <SFIOUniversalWrapper config={{
      domain: 'mandalamead.com',
      consciousnessLevel: 1000,
      migrationStrategy: 'gradual',
      enableBackwardCompatibility: true,
      sacredFireProtection: true
    }}>
      <AuthProvider value={authValue}>
        <CartProvider>
          <TemplateProvider>
            <UniversalEcommerceProvider>
              <GAPCommandProvider>
                <PANDABProvider>
                  <OneStreamCheckoutProvider>
                    <div className="min-h-screen bg-background">
                      <AppRoutes />
                      <Toaster />
                    </div>
                  </OneStreamCheckoutProvider>
                </PANDABProvider>
              </GAPCommandProvider>
            </UniversalEcommerceProvider>
          </TemplateProvider>
        </CartProvider>
      </AuthProvider>
    </SFIOUniversalWrapper>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          {/* Always-On Bridge - operates at system level, no user authentication */}
          <AlwaysOnBridgeTemplate 
            propertyDomain="mandalamead.com"
            propertyName="MandalaMead Sacred Beverages"
            consciousnessBaseline={700}
            bridgeCapabilities={['universal_service_bridge', 'consciousness_sync', 'discovery', 'bidirectional_sync']}
          />
          <AppWithAuth />
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
