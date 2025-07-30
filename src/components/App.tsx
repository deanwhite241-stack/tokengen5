@@ -1,4 +1,5 @@
 import React, { useState, useEffect } from 'react';
+import { GlobalNavigation } from './GlobalNavigation';
 import { LandingPage } from './LandingPage';
 import { TokenBuilder } from './TokenBuilder';
 import { VestingConfiguration } from './VestingConfiguration';
@@ -119,7 +120,6 @@
   switch (currentStep) {
     case 'landing':
       return (
         <>
-        <LandingPage 
+        <LandingPage
           onGetStarted={handleGetStarted}
           onLaunchSale={handleLaunchSale}
           onViewSales={handleViewSales}
@@ -129,7 +129,6 @@
           onLiquidityLock={handleLiquidityLock}
           onAirdrop={handleAirdrop}
           onAdminPanel={handleAdminPanel}
-          onAdminPanel={handleAdminPanel}
         />
-        <NetworkModeIndicator />
         </>
       );
     
@@ -140,7 +139,6 @@
           onNext={handleTokenConfigComplete}
           initialConfig={tokenConfig || undefined}
         />
-        <NetworkModeIndicator />
         </>
       );
     
@@ -151,7 +149,6 @@
           onBack={goBack}
           onNext={handleVestingComplete}
         />
-        <NetworkModeIndicator />
         </>
       );
     
@@ -162,7 +159,6 @@
           onBack={goBack}
           onDeploy={handleDeploy}
         />
-        <NetworkModeIndicator />
         </>
       );
     
@@ -173,7 +169,6 @@
             deploymentMethod={deploymentMethod}
             onStartNew={handleStartNew}
           />
-          <NetworkModeIndicator />
         </>
       );
     
@@ -183,7 +178,6 @@
         <PresaleWizard
           onBack={() => setCurrentStep('landing')}
         />
-        <NetworkModeIndicator />
         </>
       );
     
@@ -191,7 +185,6 @@
       return (
         <>
           <MySales />
-          <NetworkModeIndicator />
         </>
       );
     
@@ -199,7 +192,6 @@
       return (
         <>
           <DeployedTokens />
-          <NetworkModeIndicator />
         </>
       );
     
@@ -207,7 +199,6 @@
       return (
         <>
           <SaleRouter />
-          <NetworkModeIndicator />
         </>
       );
     
@@ -215,7 +206,6 @@
       return (
         <>
           <SaleExplorer />
-          <NetworkModeIndicator />
         </>
       );
     
@@ -223,7 +213,6 @@
       return (
         <>
           <TokenManagement />
-          <NetworkModeIndicator />
         </>
       );
     
@@ -231,7 +220,6 @@
       return (
         <>
           <LiquidityLock />
-          <NetworkModeIndicator />
         </>
       );
       
@@ -239,7 +227,6 @@
       return (
         <>
           <Airdrop />
-          <NetworkModeIndicator />
         </>
       );
     
@@ -247,7 +234,6 @@
       return (
         <>
           <BadgeManagementPanel />
-          <NetworkModeIndicator />
         </>
       );
     
@@ -255,7 +241,6 @@
       return (
         <>
           <GovernanceDashboard />
-          <NetworkModeIndicator />
         </>
       );
     
@@ -263,7 +248,6 @@
       return (
         <>
           <ProposalDetail />
-          <NetworkModeIndicator />
         </>
       );
     
@@ -271,7 +255,6 @@
       return (
         <>
           <NotFound />
-          <NetworkModeIndicator />
         </>
       );
     
@@ -282,7 +265,6 @@
       if (!validRoutes.includes(currentStep)) {
         return (
           <>
             <NotFound />
-            <NetworkModeIndicator />
           </>
         );
       } else {
         return (
           <>
-          <LandingPage 
+          <LandingPage
             onGetStarted={handleGetStarted}
             onLaunchSale={handleLaunchSale}
             onViewSales={handleViewSales}
@@ -296,7 +278,6 @@
             onAirdrop={handleAirdrop}
             onAdminPanel={handleAdminPanel}
           />
-          <NetworkModeIndicator />
           </>
         );
       }