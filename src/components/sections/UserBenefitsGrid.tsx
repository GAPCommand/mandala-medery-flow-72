
import React from 'react';

interface UserBenefitsGridProps {
  userRoles: string[];
}

const UserBenefitsGrid = ({ userRoles }: UserBenefitsGridProps) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
      {Array.isArray(userRoles) && userRoles.includes('distributor') ? (
        <>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="font-semibold mb-2">Premium Products</h3>
            <p className="text-amber-100 text-sm">
              Exclusive access to sacred Kashmir mead with territorial protection
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="font-semibold mb-2">Growth Analytics</h3>
            <p className="text-amber-100 text-sm">
              Track your territory performance and customer expansion
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="font-semibold mb-2">Marketing Support</h3>
            <p className="text-amber-100 text-sm">
              Professional materials and training for end-customer success
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="font-semibold mb-2">Business Operations</h3>
            <p className="text-amber-100 text-sm">
              Complete control over products, orders, and distributor relations
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="font-semibold mb-2">Analytics & Intelligence</h3>
            <p className="text-amber-100 text-sm">
              Deep insights into sales performance and market opportunities
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="font-semibold mb-2">System Management</h3>
            <p className="text-amber-100 text-sm">
              User administration, security controls, and content management
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserBenefitsGrid;
