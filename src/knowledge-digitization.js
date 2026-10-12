// Graph-reading allowance is separate from experimental SD/SE/CI.
export function validDigitization(o) {
 const d=o.digitization, finite=Number.isFinite;
 if(!d || d.axisScale!=='linear' || !/^https:\/\/[^\s<>"\\]+$/.test(d.imageUrl) || !/^[a-f0-9]{64}$/.test(d.imageSha256))return false;
 if(!Number.isInteger(d.imageWidth)||d.imageWidth<1||!Number.isInteger(d.imageHeight)||d.imageHeight<1)return false;
 if(!Array.isArray(d.axis)||d.axis.length!==2||!d.axis.every(a=>finite(a.pixelY)&&a.pixelY>=0&&a.pixelY<d.imageHeight&&finite(a.value)))return false;
 const [a,b]=d.axis, p=d.point;
 if(a.pixelY>=b.pixelY||a.value===b.value||!p||!finite(p.pixelX)||p.pixelX<0||p.pixelX>=d.imageWidth||!finite(p.pixelY)||p.pixelY<a.pixelY||p.pixelY>b.pixelY)return false;
 if(!Number.isInteger(d.roundingDecimals)||d.roundingDecimals<0||d.roundingDecimals>6)return false;
 if(!finite(d.markerAllowancePixels)||d.markerAllowancePixels<=0||!finite(d.axisAllowancePixels)||d.axisAllowancePixels<=0)return false;
 const slope=(b.value-a.value)/(b.pixelY-a.pixelY);
 const value=Number((a.value+(p.pixelY-a.pixelY)*slope).toFixed(d.roundingDecimals));
 const allowance=(d.markerAllowancePixels+d.axisAllowancePixels)*Math.abs(slope)+.5*10**-d.roundingDecimals;
 const review=d.review;
 return o.value===value && finite(d.readingAllowance) && d.readingAllowance>=allowance &&
  !!review?.checkedBy && !!review.checkedAt && review.status==='checked' && finite(review.secondPixelY) &&
  review.secondPixelY>=a.pixelY && review.secondPixelY<=b.pixelY && Math.abs(review.secondPixelY-p.pixelY)<=d.markerAllowancePixels;
}
