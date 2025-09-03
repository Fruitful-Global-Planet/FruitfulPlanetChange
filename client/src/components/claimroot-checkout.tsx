import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Shield, Zap, CreditCard } from "lucide-react"

interface ClaimRootCheckoutProps {
  sector?: string
  price?: number
  onCheckoutComplete?: () => void
}

export default function ClaimRootCheckout({ 
  sector = "Technology", 
  price = 1140,
  onCheckoutComplete 
}: ClaimRootCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Card className="max-w-lg mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-amber-500/20">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-amber-400 mr-2" />
          <span className="text-2xl font-bold text-amber-400">ClaimRoot</span>
        </div>
        <CardTitle className="text-white">🧬 License Checkout</CardTitle>
        <CardDescription className="text-slate-300">
          Scroll-compliant licensing for {sector} sector
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* License Details */}
        <div className="bg-slate-800/50 p-4 rounded-lg border border-amber-500/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300">ClaimRoot License – CodeFlow</span>
            <Badge variant="outline" className="border-amber-500 text-amber-400">
              {sector}
            </Badge>
          </div>
          <div className="text-2xl font-bold text-white">${price.toLocaleString()} USD</div>
          <div className="text-sm text-slate-400">Annual license with VaultMesh activation</div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <div className="flex items-center text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
            🧬 VaultMesh activation included
          </div>
          <div className="flex items-center text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
            FAA-X13 Treaty compliance
          </div>
          <div className="flex items-center text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
            SHA-256 metadata seal
          </div>
          <div className="flex items-center text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
            TreatyFlame audit trail
          </div>
        </div>

        {/* PayPal Integration */}
        <div className="space-y-4">
          {/* Option 1: Direct PayPal Checkout Link */}
          <div className="text-center">
            <a 
              href="https://www.paypal.com/ncp/payment/K9BPET82JDRQ4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              🧬 Purchase ClaimRoot License - ${price.toLocaleString()} USD
            </a>
            <div className="mt-4 text-center">
              <img 
                src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" 
                alt="Payment methods accepted" 
                className="inline-block max-w-40"
              />
            </div>
          </div>

          {/* Option 2: Fallback Form Button */}
          <div className="text-center">
            <form 
              action="https://www.paypal.com/ncp/payment/K9BPET82JDRQ4" 
              method="post" 
              target="_blank"
              className="inline-grid justify-items-center align-content-start gap-2"
            >
              <input 
                type="submit" 
                value="Buy Now - ClaimRoot License" 
                className="text-center border-none rounded min-w-48 px-8 h-11 font-bold bg-amber-400 text-black hover:bg-amber-500 transition-colors cursor-pointer"
              />
              <img 
                src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" 
                alt="Payment methods accepted" 
                className="max-w-32"
              />
              <section className="text-xs text-slate-400">
                Powered by{" "}
                <img 
                  src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg" 
                  alt="PayPal" 
                  className="h-3.5 inline align-middle"
                />
              </section>
            </form>
          </div>
        </div>

        {/* VaultLevel 7 Status */}
        <div className="bg-green-900/20 border border-green-500/20 p-3 rounded-lg">
          <div className="flex items-center justify-center text-green-400 mb-2">
            <Zap className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">VaultLevel 7 Verified</span>
          </div>
          <div className="text-xs text-center text-slate-400">
            FAA Treaty compliant • Scroll verified • Flame sealed
          </div>
        </div>
      </CardContent>
    </Card>
  )
}