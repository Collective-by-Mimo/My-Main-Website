import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import MediaPage from '@/pages/MediaPage';
import ChatPage from '@/pages/ChatPage';
import ShopPage from '@/pages/ShopPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CheckoutSuccessPage from '@/pages/CheckoutSuccessPage';
import MimoCollectivePage from '@/pages/MimoCollectivePage';
import GeneralServicesPage from '@/pages/GeneralServicesPage';
import PartnersServicesPage from '@/pages/PartnersServicesPage';
import BrandsPage from '@/pages/BrandsPage';
import CollaborationsPage from '@/pages/CollaborationsPage';
import OffersPage from '@/pages/OffersPage';
import AdminPage from '@/pages/AdminPage';
import LegalComplaintServicePage from '@/pages/LegalComplaintServicePage';
import LegalComplaintClientDashboard from '@/components/LegalComplaintClientDashboard';
import LegalComplaintIntakeForm from '@/components/LegalComplaintIntakeForm';
import ClientMessagingPage from '@/components/ClientMessagingPage';
import LegalComplaintCaseDeliverable from '@/components/LegalComplaintCaseDeliverable';
import SampleCaseStructure from '@/components/SampleCaseStructure';
import WhatYouWillReceivePage from '@/pages/WhatYouWillReceivePage';
import TermsAndConditionsPage from '@/pages/TermsAndConditionsPage';
import PaymentTermsPage from '@/pages/PaymentTermsPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import FireflyBackground from '@/components/HypnoticBackground';
import AuthPage from '@/pages/AuthPage';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { CartProvider } from '@/hooks/useCart';
import { TranslationProvider } from '@/contexts/TranslationContext';

function App() {
  useEffect(() => {
    // Task 1 & 3: Clear service workers and application caches to ensure fresh state
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }

    if ('caches' in window) {
      caches.keys().then((names) => {
        for (const name of names) {
          caches.delete(name);
        }
      });
    }

    // Clear session storage to ensure no stale context state is persisted across tabs
    sessionStorage.clear();
    
    // Note: Intentionally avoiding a full localStorage.clear() by default to prevent 
    // logging out the user (Supabase auth) or clearing the shopping cart unnecessarily, 
    // but clearing specific known stale data keys could be added here if needed.
  }, []);

  return (
    <TranslationProvider>
      <CurrencyProvider>
        <CartProvider>
          <div className="min-h-screen bg-[#0A1612] text-[#EBE8E3] overflow-x-hidden selection:bg-[#E0A995] selection:text-[#0A1612]">
            <Helmet>
              <title>Movsum Mirzazada - Official Website</title>
              <meta name="description" content="Official website of Movsum Mirzazada, award-winning Azerbaijani actor, creative professional, and founder of Mimo's Collective." />
              <link rel="canonical" href="https://www.movsummirzazada.com/" />
              <meta name="robots" content="index,follow" />
              {/* Task 1 & 4: Aggressive Cache-Control headers for Google Search Console testing */}
              <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
              <meta httpEquiv="Pragma" content="no-cache" />
              <meta httpEquiv="Expires" content="0" />
            </Helmet>
            <FireflyBackground />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="auth" element={<AuthPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="media" element={<MediaPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="chat" element={<ChatPage />} />
                
                <Route path="product/:id" element={<ProductDetailPage />} />
                <Route path="checkout-success" element={<CheckoutSuccessPage />} />
                
                <Route path="mimo-collective">
                  <Route index element={<MimoCollectivePage />} />
                  <Route path="shop" element={<ShopPage />} />
                  <Route path="general-services" element={<GeneralServicesPage />} />
                  <Route path="partners-services" element={<PartnersServicesPage />} />
                  <Route path="brands" element={<BrandsPage />} />
                  <Route path="collaborations" element={<CollaborationsPage />} />
                  <Route path="offers" element={<OffersPage />} />
                  <Route path="legal-complaint-service" element={<LegalComplaintServicePage />} />
                </Route>
                
                <Route path="legal-complaint-intake" element={<ProtectedRoute><LegalComplaintIntakeForm /></ProtectedRoute>} />
                <Route path="legal-complaint-dashboard" element={<ProtectedRoute><LegalComplaintClientDashboard /></ProtectedRoute>} />
                <Route path="legal-complaint-what-you-receive" element={<WhatYouWillReceivePage />} />
                
                <Route path="client-messaging" element={<ProtectedRoute><ClientMessagingPage /></ProtectedRoute>} />
                <Route path="client-messaging/:conversationId" element={<ProtectedRoute><ClientMessagingPage /></ProtectedRoute>} />
                
                <Route path="case-deliverable/:intakeId" element={<ProtectedRoute><LegalComplaintCaseDeliverable /></ProtectedRoute>} />
                <Route path="sample-case-structure" element={<SampleCaseStructure />} />
                
                <Route path="terms-and-conditions" element={<TermsAndConditionsPage />} />
                <Route path="payment-terms" element={<PaymentTermsPage />} />
              </Route>
              
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } />
              
               <Route path="/admin/case-deliverables" element={
                <ProtectedRoute>
                   <AdminPage /> 
                </ProtectedRoute>
               } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </CartProvider>
      </CurrencyProvider>
    </TranslationProvider>
  );
}

export default App;