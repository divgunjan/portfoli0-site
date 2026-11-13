import numpy as np


def mse_gradient(
    input: np.ndarray,
    weight: np.ndarray,
    bias: np.ndarray | None,
    target: np.ndarray,
) -> tuple[np.ndarray, np.ndarray | None]:
    """
    input:  shape (batch_size, in_features)
    weight: shape (out_features, in_features)
    bias:   shape (out_features,), or None
    target: shape (batch_size, out_features)

    Returns:
        grad_weight: same shape as weight
        grad_bias: same shape as bias, or None if bias is None
    """
    # TODO: Implement the gradient formulas derived in Theory.
    # Do not use an autograd library -- these are the manual derivatives.

    batch_size = input.shape[0]
    out_features = target.shape[1]
    n =batch_size*out_features
    prediction = None
    
    if bias is not None:
        prediction = input @ weight.T + bias 
    else:
        prediction = np.dot(input, weight.T)
    
    loss = np.sum((prediction-target)**2)/n
    d1 = (2*(prediction-target))/n
    grad_weight = d1.T @ input

    grad_bias = 0
    if bias is not None:
        grad_bias = np.sum(d1, axis=0)
    else:
        grad_bias=None

    return grad_weight, grad_bias
